/* External dependencies */
import chalk from 'chalk';
import jsonFile from 'jsonfile';

const key = process.env.TRELLO_API_KEY || '';
const token = process.env.TRELLO_AUTH_TOKEN || '';

export const auth = {
  key,
  token,
};

export const resourceIds = {
  actionId: '592b4b6716732423b99d7f9a',
  commentId: '59370991f5bdf80363e086ad',
  boardId: 'bJDPVV1A',
  cardId: 'GATVPdJ6',
  labelId: '5927718cced82109ffc85150',
  memberId: '56c266ee58b06885bc4e54e3',
  membershipId: '5927718c7a9e8015ddbedcfe',
};

/**
 * Logger used to log test data to the console and save results of tests to
 *    a file for review.
 */
export class Logger {
  constructor() {
    this.testName = '';
    this.testResults = {};
    this.endpoint = '';
    this.dataFromApiCall = {};
  }

  /**
   * Appends an object containing the endpoint and data from the API call to
   *    the testResults object with a key of the test name.
   * @private
   */
  _appendToTestResults() {
    this.testResults[this.testName] = {
      endpoint: this.endpoint,
      data: this.dataFromApiCall,
    };
  }

  /**
   * If the LOG_TEST_RESULTS environment variable is "true", log the endpoint
   *    and response data to the console.
   * @private
   */
  _logToConsoleIfRequired() {
    if (process.env.LOG_TEST_RESULTS) {
      console.log(chalk.magenta('ENDPOINT:'));
      console.log(chalk.magenta(`${this.endpoint}\n`));
      console.log(chalk.blue.bold('DATA:'));
      console.log(chalk.blue(JSON.stringify(this.dataFromApiCall)));
    }
  }

  /**
   * Extrapolates the endpoint and data from the API response.
   * @param {Object} response Response object from the API call.
   * @private
   */
  _parseResponse(response) {
    if (response.data) {
      this.dataFromApiCall = response.data;
    }

    // Removes the key and token suffix from the route path prior to assigning
    // it to the value of endpoint.
    if (response.request) {
      const keySeparator = 'key=';
      const path = response.request.path || keySeparator;
      this.endpoint = path.split(keySeparator)[0].slice(0, -1);
    }
  }

  /**
   * If the SAVE_TEST_RESULTS environment variable is "true", save the test
   *    results to a JSON file in the directory specified in the constructor.
   * @param {string} folderName Name of the folder to save the results.json
   *    file.
   * @returns {Promise}
   */
  writeResultsToFile(folderName) {
    // Don't write the results if the environment variable isn't set.
    if (process.env.LOG_TEST_RESULTS) {
      return Promise.resolve();
    }

    // The "folderName" was specified in the constructor.  If it isn't present,
    // return a rejected Promise.
    if (!folderName) {
      return Promise.reject(new Error('No folder name was specified.'));
    }

    // The test results are stored in a single file named "results.json".  The
    // file is located in the folder associated with the resource.
    const filePath = `./tests/${folderName}/results.json`;
    const dataToWrite = this.testResults || {};
    return new Promise((resolve, reject) => {
      jsonFile.writeFile(filePath, dataToWrite, { spaces: 2}, (error) => {
        if (error) {
          reject(new Error(error));
        }
        resolve();
      });
    });
  }

  /**
   * Extrapolates the name of the test from the title specified in the
   *    beforeEach method from Mocha.  The test naming convention is:
   *    <code>ACTG01-01</code>
   * @param {string} testTitle Title of the test to parse, it's in the format:
   *    <code>ACTG01-01 | gets an action</code>
   */
  setTestName(testTitle) {
    if (testTitle.includes(' | ')) {
      this.testName = testTitle.split(' | ')[0];
    } else {
      this.testName = 'Unknown';
    }
  }

  /**
   * Parses the response from the API call, extrapolates the pertinent data,
   *    logs to the console (if required), and stores the results.
   * @param {Object} response Response object from API call.
   * @returns {Promise}
   */
  processResponse(response) {
    return new Promise((resolve, reject) => {
      this._parseResponse(response);
      if (this.dataFromApiCall) {
        this._logToConsoleIfRequired();
        this._appendToTestResults();
        resolve();
      } else {
        reject(new Error('Error processing response through Logger.'));
      }
    });
  }
}
