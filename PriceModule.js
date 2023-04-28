class Price {
  #current_ppg = 1.50;
  #company_profit = 0.10;
  #location_factor;
  #history_factor;
  #gallons_req_factor;
  #gallons_requested;

  constructor(state, history_count, gallons_requested){
    console.log(state);
    this.#location_factor = state != 'TX' ? 0.04 : 0.02;
    this.#history_factor = history_count > 0 ? 0.01 : 0.0;
    this.#gallons_req_factor = gallons_requested > 1000 ? 0.02 : 0.03;
    this.#gallons_requested = gallons_requested;
    console.log(this.#location_factor);
    console.log(this.#history_factor);
    console.log(this.#gallons_req_factor);
    console.log(this.#gallons_requested);
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

module.exports = Price;