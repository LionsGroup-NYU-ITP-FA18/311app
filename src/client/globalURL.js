/*
  This is the url used for CRUD requests within the frontend code.
  The ec2 instance public DNS should be used when putting the code in production,
  while localhost can be used locally for development.
  The correct URL must be switched when putting the app in production, else the
  web app running on AWS will fail.
*/


// Production
// export const appURL = 'ec2-35-153-81-20.compute-1.amazonaws.com';

// Development, port number should match listening port from server
export const appURL = 'http://localhost:3000';
