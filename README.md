# Quoting System (Backend)

## Criteria
- Server Side Performance
- User experience

## Enviroment

  #### Promgramming Language
     JavaScript (ES6)

  #### Server
     Node.js 

  ### Database
     MongoDB

## Strategy

### Using ReadFile of File System (FS)
Node.js has a built-in file system library called **fs**, its method **readFile** load complete file to server memory, so we have to wait until the complete file is loaded to do any business logic on it. Bad memory usage.
```
  algorithm: /src/lib/readFile.js
```
### Using Stream reader
Node.js stream libraries optimize data processing, It read and write files by chunks, It is useful for large files improving memory efficiency usage.
```
  algorithm: /src/lib/readStream.js
```
### Using Data Base
It solution guarantee data storage and integrity, but It need to request database information and It more time than a file reading.  
```
  algorithm: /src/lib/mongodb.js
   function: getQuotationData
```

### Using Data Base with Server Side Cache
Still, It depends on database response but I don't request information to the database each time that we need, then server response is more quickly, so far, though, the cache needs memory, large data size could changes our strategy.
```
  algorithm: /src/lib/mongodb.js
   function: getQuotationCachedData 
```

# The Winner: Stream Reader
### Why
  - Performance
  - Memory Usage
  - Read File optimization (chunk) 

## Run Project on Dev
#### Install dependecies
```
npm install
```

#### Install dependecies
```
npm run start
```
Project run port 6060


