exports.fileUpload = (req, res, next) => {
  res.status(200).json({
    filename: req.file.filename
  });
}