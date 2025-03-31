import e from "express";

const app = e();

app.listen(4000, (err) => {
	if (err) {
		console.error("Error starting server:", err);
		return;
	}
	console.log("Server is running on port 4000");
});
