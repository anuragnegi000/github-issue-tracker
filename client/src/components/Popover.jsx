import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { useData } from '../pages/Home/dataContext'
export function PopoverDemo(props) {
  const [particular_user,setParticularUser] = useState('');
  const [default_value, setDefaultValue] = useState('');
  const {data,setData} = useData();

  useEffect(()=>{
    setParticularUser(data[props.idx].particular_user);
    setDefaultValue(props.default_value);
    const copy = data;
    copy[props.idx].particular_user = particular_user;
    setData(copy);
  },[])

  const handleChange = (e) =>{
    setParticularUser(e.target.value);
    console.log(particular_user);
  }
  
  const updateUser = async() => {
    console.log('hereasd');
    setDefaultValue(particular_user);
    await fetch("http://localhost:8080/repos/update/user", { 
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        repo_id : props.repo_id,
        particular_user: particular_user
      }),
    });
    
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Set Issue creator</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Issue creator</h4>
            <p className="text-sm text-muted-foreground">
              Set the user whose created issues updates you want to receive
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="user">user</Label>
              <Input
                defaultValue={default_value}
                id="user"
                className="col-span-2 h-8"
                onChange={handleChange}
              />
              <Button onClick = {updateUser}>Set</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
