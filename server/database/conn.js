import mongoose from 'mongoose';

//Database Connection
mongoose.connect('connection-string');

//Exporting the connection
export default mongoose;