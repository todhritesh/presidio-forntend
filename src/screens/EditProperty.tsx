

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import privateClient from "@/config/api"
import { toast } from "react-toastify"
import Spinner from "@/app-components/Spinner"
import { Textarea } from "@/components/ui/textarea"
import { useProfileState } from "@/zustand/profileStore"
import { useLocation } from "react-router-dom"

const MAX_FILE_SIZE = 2000000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

export const fileSchema = z.any().optional()
.refine(file => file?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
.refine(file => file?.length == 1 ? file[0]?.size <= MAX_FILE_SIZE ? true : false : true, 'Max file size allowed is 8MB.')


const formSchema = z.object({
    propertyTitle: z.string().min(2, {
        message: "Property Title must be at least 2 characters.",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    price: z.number().min(1, {
        message: "Count is required",
    }),
    fullAddress: z.string().min(1, {
        message: "Address is required",
    }),
    noOfBedroom: z.number().min(1, {
        message: "No. of bathroom is required",
    }),
    noOfBathroom: z.number().min(1, {
        message: "No. of bathroom is required",
    }),
    area: z.number().min(1, {
        message: "Area is required",
    }),
    contactName: z.string().min(2, {
        message: "Contact Name must be at least 2 characters.",
    }),
    contactPhoneNo: z.string().min(10, { message: "Mobile no. must have 10 digits" }).max(10, { message: "Mobile no. must have 10 digits" }),
    contactEmail: z.string().email(),

})


function EditProperty() {
    const {state} = useLocation();

    const userId = useProfileState(state=>state.userId)

    const [loading,setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            propertyTitle:state.propertyTitle,
            description:state.description,
            price:state.price,
            fullAddress:state.fullAddress,
            noOfBedroom:state.noOfBedroom,
            noOfBathroom:state.noOfBathroom,
            area:state.area,
            contactName:state.contactName,
            contactPhoneNo:state.contactPhoneNo,
            contactEmail:state.contactEmail,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
           

            const res = await privateClient.put(`/property/edit/${state?._id}`,{
                ...values,
            })
            console.log(res,"hello")
            toast.success("Property Added Successfully")
        } catch (e:any) {
            console.log("something went wrong")
            toast.error(e?.response?.data?.message||"Something went wrong")
        } finally {
            setLoading(false)
        }
        
    }

    return (
        <div className="container flex mx-auto justify-center my-12 px-2">
            {
                loading && <Spinner/>
            }
            <div className="md:w-[400px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="propertyTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Title*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Property Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Description*</FormLabel>
                                    <FormControl>
                                    <Textarea
                                        placeholder="Property Description"
                                        className="resize-none"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price*</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fullAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Address*</FormLabel>
                                    <FormControl>
                                    <Textarea
                                        placeholder="Full Address"
                                        className="resize-none"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="noOfBedroom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No of bedrooms*</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="No of Bedrooms" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="noOfBathroom"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No of bathroom*</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="No of Bathrooms" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area*</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Area" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Name*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactPhoneNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Phone No.*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact Phone No."  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Email*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contact Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="px-8" type="submit">Edit Your Property</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default EditProperty