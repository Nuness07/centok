export class InsufficientBalanceError extends Error {
  constructor(message = "Available balance is insufficient for this action.") {
    super(message);
    this.name = "InsufficientBalanceError";
  }
}

export class QuoteExpiredError extends Error {
  constructor(message = "This quote has expired. Refresh it to continue.") {
    super(message);
    this.name = "QuoteExpiredError";
  }
}

export class AssetUnavailableError extends Error {
  constructor(message = "This asset is currently unavailable.") {
    super(message);
    this.name = "AssetUnavailableError";
  }
}

export class FundingFailedError extends Error {
  constructor(message = "The simulated funding transaction failed.") {
    super(message);
    this.name = "FundingFailedError";
  }
}

export class PurchaseFailedError extends Error {
  constructor(message = "The simulated purchase failed.") {
    super(message);
    this.name = "PurchaseFailedError";
  }
}

export class StorageUnavailableError extends Error {
  constructor(message = "Browser storage is unavailable for the demo state.") {
    super(message);
    this.name = "StorageUnavailableError";
  }
}
