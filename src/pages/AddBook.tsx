import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { addBooks } from "@/http/api";
import { LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
  coverImage: z.instanceof(FileList).refine((file) => {
    return file.length == 1;
  }, "coverImage is Required"),
  file: z.instanceof(FileList).refine((file) => {
    return file.length == 1;
  }, "Book Pdf is Required"),
});

const AddBook = () => {
    const navigate = useNavigate()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: "",
    },
  });

  const coverImageRef = form.register("coverImage");
  const fileRef = form.register("file");
  //fresh data show 

const queryClient = useQueryClient()

  //mutation
  const mutation = useMutation({
    mutationFn: addBooks,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey:['books']
        })
     
      //navigate
      console.log("book created");
      navigate('/dashboard/books')
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("genre", values.genre);
    formData.append("coverImage", values.coverImage[0]);
    formData.append("file", values.file[0]);

    mutation.mutate(formData);
    console.log(values);
  }

  return (
    <>
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/dash">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/books">
                      Books
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />

                  <BreadcrumbItem>
                    <BreadcrumbPage>Add Book</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-3">
                <Link to={'/dashboard/books'}>
                <Button variant={"outline"}>Cancel</Button>
                </Link>
               
                <Button
                  type="submit"
                  
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && (
                    <LoaderCircle className=" animate-spin" />
                  )}
                  <span className="ml-2">Submit</span>
                </Button>
              </div>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Create a new book</CardTitle>
                <CardDescription>
                  Fill out the form below to create a new book.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {/* for title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue="Think Different"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* for genre */}

                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="w-full"
                            defaultValue="Non-Fiction"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* coverimage */}
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={() => (
                      <FormItem>
                        <FormLabel>CoverImage</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="w-full"
                            {...coverImageRef}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* upload book pdf */}

                  <FormField
                    control={form.control}
                    name="file"
                    render={() => (
                      <FormItem>
                        <FormLabel>Upload Book Pdf</FormLabel>
                        <FormControl>
                          <Input type="file" className="w-full" {...fileRef} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </section>
    </>
  );
};

export default AddBook;
