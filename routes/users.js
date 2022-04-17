const router = require("express").Router();
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

			const userPhone = await User.findOne({ number: req.body.number });
			if (userPhone)
				return res
					.status(409)
					.send({ message: "شماره وارد شده از قبل وجود دارد!" });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "ایمیل وارد شده از قبل وجود دارد" });


		await new User({ ...req.body}).save();
		return res
				.status(200)
				.send({ message: "ایمیل وارد شده از قبل وجود kkkkدارد" });


	
	} catch (error) {
		res.status(500)
		.send({ message: "خطای سرور" });
		console.log(error);
	}
});

module.exports = router;
