import prisma from "../libs/prisma.js";

export const CreateRating = async(req,res) => {
    try {
        
        const { propertyId , name, email , rating, review } = req.body;

        if( !email || !rating || !review){
            return res.status(401).json({
                success: false,
                messgae: "All fields required!"
            });
        }
        const validPropertyId = propertyId.split("-").pop();

        const result = await prisma.ratingAndReview.create({
            data: {
                name: name ?? "Anoymous",
                email,
                rating: parseInt(rating),
                review,
                propertyId: validPropertyId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Rating and review created!",
            data: result
        })

    } catch (error) {
        console.log("Create Rating error",error.message);
        return res.status(499).json({
            success: false,
            message: error.message
        });
    }
}

export const ApproveRating = async(req,res) => {
    try {
        
        const { ratingId } = req.params;

        if(!ratingId){
            return res.status(401).json({
                success: false,
                messgae: "All fields required!"
            });
        }

        const rating = await prisma.ratingAndReview.update({
            where:{
                id: ratingId
            },
            data:{
                approved: true
            }
        });

        return res.status(200).json({
            success: true,
            message: "Rating and review approved!",
            data: rating
        })

    } catch (error) {
        console.log("Approve Rating error",error.message);
        return res.status(499).json({
            success: false,
            message: error.message
        });
    }
}

export const GetAllRating = async(req,res) => {
    try {
        const allRatings = await prisma.ratingAndReview.findMany({});

        return res.status(200).json({
            success: true,
            message: "Rating and review fetched!",
            data: allRatings
        })

    } catch (error) {
        console.log("Fetch Rating error",error.message);
        return res.status(499).json({
            success: false,
            message: error.message
        });
    }
}

export const DeleteRating = async(req,res) => {
    try {
        
        const { ratingId } = req.params;

        if(!ratingId){
            return res.status(401).json({
                success: false,
                messgae: "All fields required!"
            });
        }

        await prisma.ratingAndReview.delete({
            where:{
                id:ratingId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Rating and review deleted!",
        })

    } catch (error) {
        console.log("Delete Rating error",error.message);
        return res.status(499).json({
            success: false,
            message: error.message
        });
    }
}

export const DeleteBulkRating = async(req,res) => {
    try {
        
        const { ratingIds } = req.body;

        if(!ratingIds || ratingIds.length == 0){
            return res.status(402).json({
                success: false,
                message: "No enquiry selected!"
            })
        }

        await prisma.ratingAndReview.deleteMany({
            where:{
                id:{
                    in: ratingIds
                }
            }
        });

         return res.status(200).json({
            success: true,
            message: "Rating and review deleted!",
        })

    } catch (error) {
        console.log("Delete bulk rating error",error.message);
        return res.status(499).json({
            success: false,
            message: error.message
        })
    }
}