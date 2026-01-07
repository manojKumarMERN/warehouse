"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-switch";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    EyeClosedIcon,
    EyeIcon,
    LockIcon,
    PhoneIcon,
    User2Icon,
} from "lucide-react";
import api from "@/lib/axios";

interface User {
    password: string;
    userId: string;
}

export default function UsersLogin() {
    const [loginData, setLoginData] = React.useState<User>({
        userId: "",
        password: "",
    })
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const loginFn = async () => {
        try {
            const response = await api.post("/api/auth/login", loginData);
            const data = response.data;
            if (data?.success) {
                window.location.href = `/${data?.role}/dashboard`;
            }
        } catch (error) {
            console.error(error);
        }
    };

    // ADM001
    // admin@123


    return (
        <div className="relative z-10 w-full max-w-md rounded-2xl border bg-card p-6 sm:p-8 shadow-xl">

            <div className="flex flex-col gap-6">

                <div className="text-center space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign in to your account
                    </p>
                </div>

                <div className="flex flex-col gap-4">

                    <InputGroup>
                        <InputGroupAddon>
                            <User2Icon className="h-4 w-4 text-muted-foreground" />
                        </InputGroupAddon>
                        <InputGroupInput
                            type="tel"
                            placeholder="User ID"
                            inputMode="numeric"
                            name="userId"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                inputOnChange(e);
                            }}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon>
                            <LockIcon className="h-4 w-4 text-muted-foreground" />
                        </InputGroupAddon>

                        <InputGroupInput
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                inputOnChange(e);
                            }}
                        />


                        <Button
                            type="button"
                            onClick={() => setPasswordVisible((v) => !v)}
                            className="flex bg-transparent hover:bg-transparent items-center justify-center px-2"
                            aria-label="Toggle password visibility"
                        >
                            {passwordVisible ? (
                                <EyeIcon className="h-4 w-4 text-muted-foreground" />
                            ) : (
                                <EyeClosedIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                        </Button>

                    </InputGroup>

                    <Button className="h-11 sm:h-12 text-base font-medium"
                        onClick={loginFn}
                    >
                        Login
                    </Button>
                </div>

            </div>
        </div>
    );
}
