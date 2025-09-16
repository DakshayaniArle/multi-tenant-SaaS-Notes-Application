import User from "../models/user.js"
import dotenv from "dotenv"
import connectDB from "../config/db.js"
import bcrypt from "bcryptjs";
import Tenant from "../models/tenant.js"

dotenv.config();
await connectDB();


const seedUsers = async ()=>{
    try{
        await User.deleteMany();
        await Tenant.deleteMany();

         const tenants = [
               { name: "Acme", slug: "acme" },
               { name: "Globex", slug: "globex" },
         ];

        const createdTenants = await Tenant.insertMany(tenants);

        const tenantMap = {};
    createdTenants.forEach(t => {
      tenantMap[t.name] = t._id;
    });

        const users =[
            { email: "admin@acme.test", password: await bcrypt.hash("password", 10), role: "Admin", tenant: tenantMap["Acme"] },
            { email: "user@acme.test", password: await bcrypt.hash("password", 10), role: "Member", tenant: tenantMap["Acme"] },
            { email: "admin@globex.test", password: await bcrypt.hash("password", 10), role: "Admin", tenant: tenantMap["Globex"] },
            { email: "user@globex.test", password: await bcrypt.hash("password", 10), role: "Member", tenant: tenantMap["Globex"] },
        ]

        await User.insertMany(users);
        console.log("users & tenants are seeded");
        process.exit();
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}


seedUsers();