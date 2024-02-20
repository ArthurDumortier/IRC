const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel"); // Import the User model

// MongoDB connection
const mongoURI = "mongodb://mongo:27017/dolphinchat";

mongoose
	.connect(mongoURI)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

const numberOfRandomUsers = 10; // Variable to set the number of random users

const users = [
	{
		mail: "admin@example.com",
		username: "admin",
		super: true,
		password: "AdminPass123",
		profilPic: "https://api.dicebear.com/7.x/bottts/svg?seed=Admin",
		bio: "I'm the admin of this chat app!",
	},
	{
		mail: "user@example.com",
		username: "user",
		super: false,
		password: "UserPass123",
		profilPic: "https://api.dicebear.com/7.x/bottts/svg?seed=User",
		bio: "I'm a regular user!",
	},
];

// Generate random users based on the numberOfRandomUsers variable
for (let i = 1; i <= numberOfRandomUsers; i++) {
	users.push({
		mail: `user${i}@example.com`,
		username: `RandomUser${i}`,
		super: false,
		password: `Password${i}`,
		profilPic: `https://api.dicebear.com/7.x/fun-emoji/svg?seed=RandomUser${i}`, // Dynamic profile pic URL
		bio: "Please add a bio...", // Default bio
	});
}

const seedUsers = async () => {
	await User.deleteMany(); // Caution: This deletes all existing users!

	for (const user of users) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		await User.create({
			mail: user.mail,
			username: user.username,
			super: user.super,
			profilPic: user.profilPic,
			bio: user.bio,
			password: hashedPassword,
		});
	}

	console.log("Database seeded with fixed and random users!");
	mongoose.connection.close();
};

seedUsers().catch((err) => {
	console.error(err);
	mongoose.connection.close();
});
