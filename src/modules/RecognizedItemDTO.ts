import { RecognizedItem } from "./interfaces";

export default class RecognizedItemDTO {
  recognizedItem: RecognizedItem;

  constructor(recognizedItem: RecognizedItem) {
    this.recognizedItem = recognizedItem;
  }

  public parse(): RecognizedItem {
    const {
      name,
      value
    } = this.recognizedItem;

    return {
      name,
      value: this.convertToPercentage(value),
    };
  }

  private convertToPercentage = (value: number) => {
    const decimalNumber = 100 - Math.round(value * 100)
    return decimalNumber;
  };
  
}