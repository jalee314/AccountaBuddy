//backend entry file


const cors = require('cors');
const express = require('express');
const { exec } = require('child_process');
//NOTE: Express is used here because its super easy to define routes (URLs), process HTTP requests (GET, POST etc.), 
// process requests or perform actions before sending a response (middleware) and return responses to the client.
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//NOTE: CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to prevent malicious websites 
//from making unauthorized requests to different domains (or origins) than the one the page was served from. 
//By default, browsers restrict web pages from making requests to a different domain (a "cross-origin" request) 
//unless the server explicitly allows it.

app.use(cors()); // allows all origins
//NOTE: for use in allowing specific origins:
// app.use(cors({
//     //   origin: 'http://localhost:3001',
//     // }));

// POST route to run the C++ program
// NOTE: basically if the program receives a POST request from the front end (in this case will always be from axios),
// the server will process the reqest here (the req parameter) and respond back to the client with the result (the res parameter)
app.post('/run-add-cpp', (req, res) => {
  const input = req.body; // Get input from the request body

  // Run the C++ executable with the input
  var command = `addcard`;
  let character = '_';
  for (let i=0; i < input.length; i++) {
    
    let newTextBox1 = input[i].textBox1.replace(/ /g, character);
    let newTextBox2 = input[i].textBox2.replace(/ /g, character);
    command += ` ${newTextBox1} ${newTextBox2}`
  }
  // Command to compile and run a C++ program
  //Note: Params:
  //Error: If an error happens this will be an Error object containing information about what went wrong.
  //stdout (standard output): contains the standard output of the child process (result of program ran)
  //stderror (standard error): If the child process encounters an error during execution
  //execute our program (./program.exe)
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing program: ${error.message}`);
      //if error, send a 500 status along with error message object (TODO: display this error on the frontend)
      return res.status(500).send({ output: `Error: ${error.message}` });
    }
    if (stderr) {
      console.error(`Standard Error: ${stderr}`);
      return res.status(500).send({ output: `Error stderr: ${stderr}` });
    }
    
    // Send the standard output (result of the program) as response
    //remove this(?) don't think we need a response for this post
    res.status(200).json({ output: stdout.trim() });
  });
});

// Start the server on specific port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


app.get('/get-data', (req, res) => {

  exec('display', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing program: ${error.message}`);
      //if error, send a 500 status along with error message object (TODO: display this error on the frontend)
      return res.status(500).send({ output: `Error: ${error.message}` });
    }
    if (stderr) {
      console.error(`Standard Error: ${stderr}`);
      return res.status(500).send({ output: `Error stderr: ${stderr}` });
    }
    
    // Send the standard output (result of the program) as response
    //remove this(?) don't think we need a response for this post
    const cards = stdout.split(" ");
    let cleanedArray = cards.filter(element => element);
    console.log(cleanedArray);
    return res.status(200).json({ output: cleanedArray});
  });
});