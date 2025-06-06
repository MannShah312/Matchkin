  // // const express = require("express");
  // // const mongoose = require("mongoose");
  // // const JwtStrategy = require("passport-jwt").Strategy,
  // //     ExtractJwt = require("passport-jwt").ExtractJwt;
  // // const passport = require("passport");
  // // const User = require("./models/User");
  // // const { client, connectRedis } = require("./utils/redisClient");
  // // require("dotenv").config();
  // // const cors = require("cors");
  // // const app = express();
  // // const port = 8080;

  // // const authRoutes = require("./routes/auth");

  // // app.use(cors());
  // // app.use(express.json());

  // // mongoose
  // //     .connect(
  // //         "mongodb+srv://pdeuworkmst1:" + 
  // //         process.env.MONGO_PASSWORD + 
  // //         "@cluster0.f2axurf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

  // //         {
  // //             useNewUrlParser: true,
  // //             useUnifiedTopology: true,
  // //         }
  // //     )
  // //     .then((x) => {
  // //         console.log("Connected to Mongo!");
  // //     })
  // //     .catch((err) => {
  // //         console.log("Error while connecting to Mongo");
  // //     });

  // // // redis connection
  // // (async () => {
  // //   try {
  // //     await connectRedis();  // connect once at startup
  // //     console.log('Connected to Redis!');

  // //     app.listen(port, () => {
  // //       console.log(`App is running on port ${port}`);
  // //     });
  // //   } catch (err) {
  // //     console.error('Failed to connect to Redis:', err);
  // //   }
  // // })();    
      
  // // let opts = {
  // //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // //     secretOrKey: process.env.JWT_SECRET // Store your secret in environment variables
  // // };

  // // passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  // //     try {
  // //         const user = await User.findById(jwt_payload.userId); // Ensure this matches your JWT creation
  // //         if (user) {
  // //             return done(null, user);
  // //         } else {
  // //             return done(null, false);
  // //         }
  // //     } catch (err) {
  // //         return done(err, false);
  // //     }
  // // }));      

  // // app.get("/", (req, res) => {
  // //     // req contains all data for the request
  // //     // res contains all data for the response
  // //     res.send("Hello World");
  // // });
  // // // app.use("/auth", authRoutes);
  // // app.use("/auth", authRoutes);

  // // // app.listen(port, () => {
  // // //     console.log("App is running on port " + port);
  // // // });


  // const express = require("express");
  // const mongoose = require("mongoose");
  // const JwtStrategy = require("passport-jwt").Strategy,
  //     ExtractJwt = require("passport-jwt").ExtractJwt;
  // const passport = require("passport");
  // const User = require("./models/User");
  // const Message = require('./models/Message');
  // const { client, connectRedis } = require("./utils/redisClient");
  // require("dotenv").config();
  // const cors = require("cors");
  // const app = express();
  // const port = 8080;
  // const http = require('http');
  // const jwt = require('jsonwebtoken');
  // const authRoutes = require("./routes/auth");
  // const consultantRoutes = require("./routes/consultant");
  // const clientRoutes = require("./routes/client");
  // const matchingRoutes = require("./routes/matching");
  // const chatRoutes = require("./routes/chat");
  // const messageRoutes = require("./routes/message");

  // app.use(cors());
  // app.use(express.json());
  // app.use(passport.initialize());  // <--- Add this line
  // const server = http.createServer(app);

  // console.log(typeof authRoutes);  // should print 'function' (Express router is a callable function)

  // mongoose
  //     .connect(
  //         "mongodb+srv://pdeuworkmst1:" + 
  //         process.env.MONGO_PASSWORD + 
  //         "@cluster0.f2axurf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",

  //         {
  //             useNewUrlParser: true,
  //             useUnifiedTopology: true,
  //         }
  //     )
  //     .then(() => {
  //         console.log("Connected to Mongo!");
  //     })
  //     .catch((err) => {
  //         console.log("Error while connecting to Mongo:", err);
  //     });

  // let opts = {
  //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //     secretOrKey: process.env.JWT_SECRET
  // };

  // passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  //     try {
  //         const user = await User.findById(jwt_payload.userId);
  //         if (user) {
  //             return done(null, user);
  //         } else {
  //             return done(null, false);
  //         }
  //     } catch (err) {
  //         return done(err, false);
  //     }
  // }));

  // const io = require('socket.io')(server, {
  //   cors: { origin: '*', methods: ['GET', 'POST'] }
  // });

  // io.use((socket, next) => {
  //   const token = socket.handshake.auth.token;
  //   if (!token) return next(new Error("No auth"));

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     socket.userId = decoded.userId;
  //     next();
  //   } catch (err) {
  //     return next(new Error("Invalid token"));
  //   }
  // });

  // io.on('connection', (socket) => {
  //   console.log('User connected:', socket.userId);

  //   socket.on('join-chat', (chatId) => {
  //     socket.join(chatId);
  //   });

  //   socket.on('send-message', async ({ chatId, content }) => {
  //     const message = new Message({
  //       chatId,
  //       sender: socket.userId,
  //       content
  //     });

  //     await message.save();
  //     const populated = await message.populate('sender', 'name email');

  //     io.to(chatId).emit('receive-message', {
  //       _id: populated._id,
  //       chatId: populated.chatId,
  //       content: populated.content,
  //       sender: {
  //       _id: populated.sender._id,
  //       name: populated.sender.name,
  //       email: populated.sender.email
  //       },
  //     timestamp: populated.timestamp
  //     });

  //     // io.to(chatId).emit('receive-message', {
  //     // _id: message._id,
  //     // chatId: message.chatId,
  //     // content: message.content,
  //     // sender: {
  //     //   _id: message.sender._id,
  //     //   name: message.sender.name,
  //     //   email: message.sender.email
  //     // },
  //     // timestamp: message.timestamp
  //     // });

  //     // io.to(chatId).emit('receive-message', {
  //     //   chatId,
  //     //   content,
  //     //   sender: socket.userId,
  //     //   timestamp: message.timestamp
  //     // });
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('User disconnected:', socket.userId);
  //   });
  // });

  // app.get("/", (req, res) => {
  //     res.send("Hello World");
  // });

  // app.use("/auth", authRoutes);
  // app.use("/consultants", consultantRoutes);
  // app.use("/client", clientRoutes);
  // app.use("/match", matchingRoutes);
  // app.use("/chat", chatRoutes);


  // (async () => {
  //   try {
  //     await connectRedis();
  //     console.log('Connected to Redis!');

  //     server.listen(port, () => {
  //       console.log(`App is running on port ${port}`);
  //     });
  //   } catch (err) {
  //     console.error('Failed to connect to Redis:', err);
  //   }
  // })();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
      ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");
const { client, connectRedis } = require("./utils/redisClient");

const authRoutes = require("./routes/auth");
const consultantRoutes = require("./routes/consultant");
const clientRoutes = require("./routes/client");
const matchingRoutes = require("./routes/matching");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");
const statsRoutes = require("./routes/stats");
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(passport.initialize());

// JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.userId);
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

// MongoDB Connection
mongoose.connect(
  `mongodb+srv://pdeuworkmst1:${process.env.MONGO_PASSWORD}@cluster0.f2axurf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log("✅ Connected to MongoDB"))
 .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/consultants", consultantRoutes);
app.use("/client", clientRoutes);
app.use("/match", matchingRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use(cors({
  origin: "https://your-frontend.onrender.com",  // exact frontend URL
  credentials: true                               // ⬅️ Required for cookies
}));

// Socket.IO setup
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Socket.IO JWT auth middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
});

// Use external socket logic
require("./socket")(io);

// Redis + Server bootstrap
(async () => {
  try {
    await connectRedis();
    console.log("✅ Connected to Redis");
    server.listen(8080, () => {
      console.log("🚀 Server is running on port 8080");
    });
  } catch (err) {
    console.error("❌ Redis connection failed:", err);
  }
})();