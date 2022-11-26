import mongo from 'mongoose'

const OrganizationSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: String,
    creator:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    users:{
        //type: Array(mongo.Schema.Types.ObjectId),
        //ref: 'User',
        default: []
    },
    country: {
        String,
        default: ''
    },
    city: {
        String,
        default: ''
    },
    email:{
        String,
        type: Array
    },
    phoneNumber:{
        String,
        type: Array
    },
    text: {
        String,
        default: ''
    },
}, {
    timestamps: true,
})

export default mongo.model('Organization', OrganizationSchema)