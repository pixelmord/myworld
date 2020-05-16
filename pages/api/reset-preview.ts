export default (_req: any, res: any): void => {
  res.clearPreviewData();
  res.status(200).end();
};
