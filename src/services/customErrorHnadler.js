class CustomErrorHandler extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  static alreadyExixt(message) {
    return new CustomErrorHandler(message);
  }
  static notFound(message) {
    return new CustomErrorHandler(message);
  }
  static unauthorized(message) {
    return new CustomErrorHandler(message);
  }
  static notFound(message) {
    return new CustomErrorHandler(message);
  }
}

module.exports = CustomErrorHandler;
