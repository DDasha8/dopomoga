import Organization from "../Models/Organization.js";

export const create = async (req, res) => {
    try {
        const doc = new Organization({
            name: req.body.title,
            imageUrl: req.body.imageUrl,
            creator: req.userId,
            text: req.body.text,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};


export const getAll = async (req, res) => {
    try {
        const organisations = await Organization.find().exec();
        res.json(organisations);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};
export const getOne = async (req, res) => {
    try{
        const orgId = req.params.id;
        const organisation = await Organization.findOne({_id: orgId})
        res.json (organisation)
    }catch (err){
        console.log(err)
        res.status(404).json({
            message: "error"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const orgId = req.params.id;

        Organization.findOneAndDelete(
            {
                _id: orgId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(404).json({
                        message: 'Error remove',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Doc not found',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};
export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await Organization.updateOne(
            {
                _id: postId,
            },
            {
                name: req.body.title,
                imageUrl: req.body.imageUrl,
                creator: req.userId,
                text: req.body.text,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};