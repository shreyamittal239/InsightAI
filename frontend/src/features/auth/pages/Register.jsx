import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth.js";

const Register = () => {

    const { handleRegister } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        await handleRegister(formData);

    }

    return (

      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.25),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#0f172a_50%,_#111827_100%)] px-4 text-slate-100">

            <div className="mx-auto flex max-w-5xl items-center justify-center">

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950/70 p-6"
                >

                    <h1 className="mb-6 text-3xl font-bold">
                        Register
                    </h1>

                    <div className="space-y-4">

                        <div>

                            <label>Username</label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
                            />

                        </div>

                        <div>

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
                            />

                        </div>

                        <div>

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
                            />

                        </div>

                    </div>

                    <button
                        className="mt-6 w-full rounded-xl bg-red-600 py-3"
                    >
                        Register
                    </button>

                    <p className="mt-4 text-center">

                        Already have an account?

                        <Link
                            to="/login"
                            className="ml-2 text-red-400"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );
};

export default Register;