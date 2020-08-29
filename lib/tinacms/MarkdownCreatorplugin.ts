import { toMarkdownString } from 'next-tinacms-markdown';
import { CMS, Field, AddContentPlugin } from 'tinacms';
import { FORM_ERROR } from 'final-form';
import { getCachedFormData, setCachedFormData } from './formCache';
import { GithubClient } from 'react-tinacms-github';

type MaybePromise<T> = Promise<T> | T;

interface AnyField extends Field {
  [key: string]: any;
}

interface CreateMarkdownButtonOptions<FormShape, FrontmatterShape> {
  label: string;
  fields: AnyField[];
  filename(form: FormShape): MaybePromise<string>;
  frontmatter?(form: FormShape): MaybePromise<FrontmatterShape>;
  body?(form: FormShape): MaybePromise<string>;
  afterCreate?(response: any): void;
}

type GithubCMS = CMS & {
  api: {
    github: GithubClient;
  };
};

const MISSING_FILENAME_MESSAGE = 'createMarkdownButton must be given `filename(form): string`';
const MISSING_FIELDS_MESSAGE = 'createMarkdownButton must be given `fields: Field[]` with at least 1 item';

/**
 *
 * @deprecated in favour of calling `CreateMarkdownPlugin` class directly.
 */
export function createMarkdownButton<FormShape = any, FrontmatterShape = any>(
  options: CreateMarkdownButtonOptions<FormShape, FrontmatterShape>
): AddContentPlugin<FormShape> {
  return new MarkdownCreatorPlugin<FormShape, FrontmatterShape>(options);
}

export class MarkdownCreatorPlugin<FormShape = any, FrontmatterShape = any> implements AddContentPlugin<FormShape> {
  __type: 'content-creator' = 'content-creator';
  name: AddContentPlugin<FormShape>['name'];
  fields: AddContentPlugin<FormShape>['fields'];

  afterCreate: (response: any) => void;

  // Markdown Specific
  filename: (form: FormShape) => MaybePromise<string>;
  frontmatter: (form: FormShape) => MaybePromise<FrontmatterShape>;
  body: (form: any) => MaybePromise<string>;

  constructor(options: CreateMarkdownButtonOptions<FormShape, FrontmatterShape>) {
    if (!options.filename) {
      console.error(MISSING_FILENAME_MESSAGE);
      throw new Error(MISSING_FILENAME_MESSAGE);
    }

    if (!options.fields || options.fields.length === 0) {
      console.error(MISSING_FIELDS_MESSAGE);
      throw new Error(MISSING_FIELDS_MESSAGE);
    }

    this.name = options.label;
    this.fields = options.fields;
    this.filename = options.filename;
    this.frontmatter = options.frontmatter || (() => ({} as FrontmatterShape));
    this.body = options.body || (() => '');
    this.afterCreate = options.afterCreate || null;
  }

  async onSubmit(form: FormShape, cms: GithubCMS) {
    const fileRelativePath = await this.filename(form);
    const frontmatter = await this.frontmatter(form);
    const markdownBody = await this.body(form);

    cms.api.github
      .commit(
        fileRelativePath,
        getCachedFormData(fileRelativePath).sha,
        toMarkdownString({
          fileRelativePath,
          frontmatter,
          markdownBody,
        }),
        `Update from TinaCMS - Created ${fileRelativePath}`
      )
      .then((response) => {
        setCachedFormData(fileRelativePath, {
          sha: response.content.sha,
        });
        if (this.afterCreate) {
          this.afterCreate(response);
        }
      })
      .catch((e) => {
        return { [FORM_ERROR]: e };
      });
  }
}
