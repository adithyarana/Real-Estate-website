import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();
export const CreateContact = async(req,res) => {
   try {
    
    const { name , email  , number , city, address } = req.body;

    if(!name || !email || !number || !city){
        return res.status(401).json({
            success: false,
            message: "All fields required!",
        });
    }

    const contact = await prisma.contacts.create({
        data: {
            name,
            email,
            number,
            address,
            city
        }
    });

    return res.status(200).json({
        success: true,
        message: "Contact Created!",
        data: contact
    });

   } catch (error) {
      console.log("Create contact error",error.message);
      return res.status(499).json({
        success: false,
        message: error.message
      })
   }
}

export const UpdateContact = async(req,res) => {
    try {
        const {...data} = req.body;
        const { contactId } = req.params;

        if(!contactId || !data){
            return res.status(401).json({
                success: false,
                message: "All fields required!",
            });
        }

        const updatedContact = await prisma.contacts.update({
            where:{
                id: contactId
            },
            data: data
        });

        return res.status(200).json({
            success: true,
            message: "Contact Updated!",
            data: updatedContact
        });

    } catch (error) {
        console.log("Update contact error",error.message);
        return res.status(499).json({
          success: false,
          message: error.message
        }) 
    }
}

export const GetAllContacts = async(req,res) => {
    try {
        
        const contacts = await prisma.contacts.findMany({});

        return res.status(200).json({
            success: true,
            message: "Contact Fetched!",
            data: contacts
        });

    } catch (error) {
        console.log("Get contacts error",error.message);
        return res.status(499).json({
          success: false,
          message: error.message
        })  
    }
}

export const DeleteContact = async(req,res) => {
    try {
        
        const { contactId } = req.params;

        if(!contactId){
            return res.status(401).json({
                success: false,
                message: "All fields required!",
            });
        }

        await prisma.contacts.delete({
            where:{
                id: contactId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Contact Deleted!"
        });

    } catch (error) {
        console.log("Delete contacts error",error.message);
        return res.status(499).json({
          success: false,
          message: error.message
        })  
    }
}

export const DeleteBulkContact = async(req,res) => {
    try {
        
        let {contactIds} = req.body;

        contactIds = JSON.parse(contactIds);

        if(!contactIds && contactIds.length == 0){
            return res.status(401).json({
                success: false,
                message: "All fields required!",
            });
        }

        await prisma.contacts.deleteMany({
            where:{
                id:{
                    in: contactIds
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: "Contact Deleted!"
        });

    } catch (error) {
        console.log("Delete contacts error",error.message);
        return res.status(499).json({
          success: false,
          message: error.message
        })  
    }
}