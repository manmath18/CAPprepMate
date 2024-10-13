import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link,useNavigate} from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
      try {
          const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
          if (res.data.success) {
              dispatch(setUser(null));
              navigate("/");
              toast.success(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
      }
    }
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="flex">
        <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://t3.ftcdn.net/jpg/04/08/35/00/360_F_408350015_0KKJ7v7xTl7hCbEKoqDCy79Ges2DhIwX.jpg"
              alt=""
            />
          </Avatar>
          <div className="my-1">
            <Link to="/">
              <h1 className="text-2xl font-bold">
                CAP<span className="text-[#F83002]">prepMate</span>
              </h1>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <li>Colleges</li>
            </>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"> 
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#8148e2] hover:bg-[#7731f0]" variant="secondary">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger as>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                    alt=""
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        alt=""
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
