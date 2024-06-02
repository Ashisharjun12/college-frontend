import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/http/api";
import useTokenStore from "@/store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const navigate = useNavigate();
  const setToken = useTokenStore((state)=> state.setToken)

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("login success" ,response);
      //navigate
      setToken(response.data.accessToken)

      navigate("/dashboard/dash");
    },
  });

  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //server call
    console.log("data", { email, password });

    if (!email || !password) {
      return alert("please enter all fields");
    }

    mutation.mutate({ email, password });
  };

  return (
    <>
      <Card className="w-full max-w-sm border-none rounded-lg">
        <CardContent className="grid gap-4 py-14">
          {mutation.error && (
            <span className="text-red-500 text-sm break-before-auto">
              {mutation.error.message}
            </span>
          )}
          <div className="grid gap-2 ">
            <Label className="text-lg" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              ref={emailRef}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-lg" htmlFor="password">
              Password
            </Label>
            <Input
              ref={passwordRef}
              id="password"
              type="password"
              name="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleLogin}
            type="submit"
            className="w-full rounded-full text-md py-6 px-8 "
            disabled={mutation.isPending}
          >
            {mutation.isPending && <LoaderCircle className=" animate-spin" />}
            <span className="ml-2">Login</span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginCard;
