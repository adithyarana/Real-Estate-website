import prisma from "../libs/prisma.js";
import mailSender from "../utils/mailSender.js";
import dotenv from 'dotenv'

dotenv.config();

export const CreateEnquiry = async(req,res) => {
    try {
        
        const { name,email,message,propertyId } = req.body; 

        if(!name || !email || !message || !propertyId){
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            })
        }

        const enquiry = await prisma.enquiry.create({
            data: {
                name,
                email,
                propertyId,
                message,
                status: "PENDING"
            }
        });

         mailSender(
            email,
            "Thank you for your enquiry!",
            `<p>We will contact you soon</p>`
        );

        mailSender(
            process.env.ADMIN_EMAIL,
            "We got an new enquiry!",
           ` <div>
                <p>Name :${name}</p>
                <p>Email : ${email}</p>
                <p>PropertyId : ${propertyId}</p>
            </div>`
        );

        return res.status(200).json({
            success: true,
            message: "Enquiry submitted!",
            data: enquiry
        })

    } catch (error) {
        console.log("Create enquiry error",error.message);
        return res.status(499).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const GetAllEnquiries = async(req,res) => {
    try {
        
        const enquiries = await prisma.enquiry.findMany({});
        return res.status(200).json({
            success: true,
            message: "Enquiry fetched!",
            data: enquiries
        })

    } catch (error) {
        console.log("Get enquiry error",error.message);
        return res.status(499).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


export const UpdateEnquiryStatus = async(req,res) => {
    try {
      
        const { status , enquiryId } = req.body;

        if(!status || !enquiryId){
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            })
        }

        if(status !== "RESPONDED" && status !== "CLOSED"){
            return res.status(401).json({
                success: false,
                message: "Invalid status!"
            })
        }

        const enquiry = await prisma.enquiry.update({
            where:{
                id: enquiryId
            },
            data: {
                status
            }
        })

        return res.status(200).json({
            success: true,
            message: "Enquiry updated!",
            data: enquiry
        })

    } catch (error) {
        console.log("Update enquiry error",error.message);
        return res.status(499).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const DeleteEnquiry = async(req,res) => {
    try {
        
        const { enquiryId } = req.params;

        if(!enquiryId){
            return res.status(401).json({
                success: false,
                message: "All fields are required!"
            })
        }
        
        await prisma.enquiry.delete({
            where: {
                id: enquiryId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Enquiry deleted!",
        })

    } catch (error) {
        console.log("Delete enquiry error",error.message);
        return res.status(499).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const DeleteBulkEnquiry = async(req,res) => {
    try {
        
        const { enquiryIds } = req.body;

        if(!enquiryIds || enquiryIds.length == 0){
            return res.status(402).json({
                success: false,
                message: "No enquiry selected!"
            })
        }

        await prisma.enquiry.deleteMany({
            where:{
                id:{
                    in: enquiryIds
                }
            }
        });

         return res.status(200).json({
            success: true,
            message: "Enquiry deleted!",
        })

    } catch (error) {
        console.log("Delete bulk enquiry error",error.message);
        return res.status(499).json({
            success: false,
            message: "Something went wrong"
        })
    }
}