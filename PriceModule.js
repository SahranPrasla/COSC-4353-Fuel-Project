var pg = require('pg');

class Price {
  #current_ppg = 1.50;
  #company_profit = 0.10;
  #location_factor;
  #history_factor;
  #gallons_req_factor;
  #gallons_requested;

  constructor(location_factor, history_factor, gallons_req_factor, gallons_requested){
    this.#location_factor = location_factor;
    this.#history_factor = history_factor;
    this.#gallons_req_factor = gallons_req_factor;
    this.#gallons_requested = gallons_requested;
  }

  getMargin() {
    return this.#current_ppg * (this.#location_factor - this.#history_factor + this.#gallons_req_factor + this.#company_profit);
  }

  getSuggestedPPG(){
    return this.getMargin() * this.#current_ppg;
  }

  getTotal(){
    return this.getSuggestedPPG() * this.#gallons_requested;
  }
}