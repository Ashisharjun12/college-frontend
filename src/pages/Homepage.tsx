import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import study from "/study.jpg"
import { Link } from "react-router-dom";


const Homepage = () => {
  return (
   <>
  
    <section className="bg-white shadow-2xl ">
        <div className="container flex items-center justify-between py-20 ">
          <div className="mb-2">
            <h1 className="text-6xl font-black font-sans leading-2">
              Get All College Stuff <br />
              <span className="text-primary">Books & Notes !</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Access if Your Order Merch More Than 30 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
                <Link to={'/dashboard/dash'}>
                Get it Here
                </Link>
              
            </Button>
          </div>
          <div className="mt-4">
            {/* <Image
              className="rounded-xl "
              src={"/study.jpg"}
              width={500}
              height={500}
              alt="study.jpg"
            /> */}
           <img src={study} width={500} height={500} alt="study.jpg"/>
            
          </div>
        </div>
      </section>

      <section className="bg-[#EAF1FF]">
        <div className="container py-12">
          <Tabs defaultValue="books" className="w-full ">
            <TabsList className=" py-4 ">
              <TabsTrigger className=" text-xl " value="books">
                Books
              </TabsTrigger>
              <TabsTrigger className=" text-xl" value="pyqs">
                Pyqs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="books">
              {/* <Booklist/> */}
            </TabsContent>
            <TabsContent value="pyqs">
            
               {/* <Pyqlist/> */}
              
            </TabsContent>
          </Tabs>
        </div>
      </section>
   
   
   </>
  )
}

export default Homepage