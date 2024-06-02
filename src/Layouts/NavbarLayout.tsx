import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Outlet, Link } from "react-router-dom";
import LoginCard from "@/components/custom/LoginCard";
import RegisterCard from "@/components/custom/RegisterCard";
import useTokenStore from "@/store";

const NavbarLayout = () => {
  const token = useTokenStore((state) => state.token);

  return (
    <>
      <header className="bg-white">
        <nav className="container py-5 justify-between items-center flex">
          <div>
            <h1>Logo</h1>
          </div>
          <div>
            {token ? (
              <Link
                to="/dashboard"
                className="text-md py-3 px-6 bg-[#3A72EC] text-white rounded-full font-bold"
              >
                Dashboard
              </Link>
            ) : (
              <Dialog>
                <DialogTrigger className="text-md py-3 px-6 bg-[#3A72EC] text-white rounded-full font-bold">
                  Login
                </DialogTrigger>
                <DialogContent>
                  <section>
                    <div className="container py-6">
                      <Tabs defaultValue="login" className="w-full">
                        <TabsList className="py-4 ml-24 mb-5">
                          <TabsTrigger className="text-lg" value="login">
                            Login
                          </TabsTrigger>
                          <TabsTrigger className="text-lg" value="register">
                            Register
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                          <LoginCard />
                        </TabsContent>
                        <TabsContent value="register">
                          <RegisterCard />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </section>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </nav>
      </header>

      {/* layout */}
      <Outlet />
    </>
  );
};

export default NavbarLayout;
