const User = require("../../models/User");

const getUserCount = async (req, res, next) => {
    try {
        let user;
        if (req.user) {
            let userId = req.user._id.toString()
            user = await User.findById(userId)
        }
        let query = {
            role: null
        }

        if (user.is_rehab_employee || user.is_rehab_admin) {
            query['rehab'] = user.rehab
        }

        query["role"] = "Doctor"
        let doctorCount = await User.countDocuments(query)
        query["role"] = "Nurses"
        let nursesCount = await User.countDocuments(query)
        query["role"] = "Aya"
        let ayaCount = await User.countDocuments(query)
        query["role"] = "RehabAdmin"
        let RehabAdmin = await User.countDocuments(query)
        query["role"] = "Visiter"
        let users = await User.countDocuments(query)

        return res.status(200).json(
            {
                doctors: doctorCount,
                nurses: nursesCount,
                aya: ayaCount,
                rehab: RehabAdmin,
                users: users
            }
        );

    } catch (error) {
        return next(error);
    }
}

const updateuser = async (req, res, next) => {
    try {
        let data = req.body;
        if (data._id) {
            let user = await User.findById(data._id.toString())
            if (!user) {
                return res.status(500).json({
                    message: "user not found"
                });
            }
            await User.findByIdAndUpdate({
                _id: data._id
            },
                {
                    $set: data
                })
        }

        return res.status(200).json(
            {
                data: true
            }
        );

    } catch (error) {
        return next(error);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        let data = req.body;
        if (data._id) {
            let user = await User.findById(data._id.toString())
            if (!user) {
                return res.status(500).json({
                    message: "user not found"
                });
            }
            await User.findByIdAndDelete(data._id)
        }

        return res.status(200).json(
            {
                data: true
            }
        );

    } catch (error) {
        return next(error);
    }
}
module.exports = {
    getUserCount,
    updateuser,
    deleteUser
}