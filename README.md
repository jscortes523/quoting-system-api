# quoting-system-api

## Goal
 Select 

## Criteria
- Server Side Performance
- Data Integrity

## Enviroment

  #### Promgramming Language
     JavaScript (ES6)

  #### Server
     Node.js 

  ### Database
     MongoDB

## Strategy

### Using ReadFile of File System (FS)
Node.js has a built-in file system library called **fs**, its method **readFile** load complete file to server memory, so we have to wait until the complete file is loaded to do any business logic on it.

### Using Stream
Node.js stream libraries optimize data processing, It read and write files by chunks, It is useful for large files improving memory usage that means without server response affectation.

### Using Data Base

### Using Data Base with Server Side Cache


## Conclusion



