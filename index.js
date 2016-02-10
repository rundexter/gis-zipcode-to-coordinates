//https://github.com/dryan/static-zipcode-api
module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var data = null
            , zipcodes = step.input('zipcodes')
            , response = []
            , failures = []
        ;
        zipcodes.each(function(zipcode) {
            try {
                data = require('./zipcodes/' + zipcode);
                response.push(data);
            } catch(e) {
                failures.push(zipcode);
                response.push({ lat: null, lng: null });
            }
        });
        if(failures.length > 0) {
            this.log('Failed fetching ' + failures.length + ' of ' + zipcodes.length + ' coordinate(s)', { failures: failures });
        }
        this.complete(response);
    }
};
