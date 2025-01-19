import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-center text-gray-700 mb-4">About Stream Share</h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                    The idea behind <span className="text-blue-500">Stream Share</span> was born out of a simple
                    frustration: why does sharing files feel so complicated? We envisioned a platform where people could
                    share their files as effortlessly as they talk to one another, without the need for uploads, waiting
                    times, or storage worries.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    <span className="font-semibold">Stream Share</span> is our solution to this problem. Designed with
                    simplicity and efficiency at its core, it empowers people to share files instantly, securely, and
                    directly.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mt-6">Our Core Values:</h2>
                <ul className="list-disc list-inside text-lg text-gray-700 mt-4 space-y-2">
                    <li>
                        <span className="font-semibold">Ease of Use:</span> Designed for everyone, from tech-savvy
                        individuals to first-time users.
                    </li>
                    <li>
                        <span className="font-semibold">Privacy First:</span> Your files are yours. We don’t store
                        them—ever.
                    </li>
                    <li>
                        <span className="font-semibold">Simple Yet Powerful:</span> No sign-ups, no complex setup—just
                        create a room and get started.
                    </li>
                </ul>

                <div className="mt-10 border-t border-gray-300 pt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">About the Developer</h2>
                    <p className="text-lg text-gray-700 leading-relaxed text-center">
                        I am an enthusiastic software engineer who built this application to make file sharing easy and
                        hassle-free. Feel free to reach out to me at:
                    </p>
                    <div className="mt-6 text-center">
                        <a
                            href="mailto:dec18anu@gmail.com"
                            className="text-indigo-600 hover:underline text-lg font-semibold"
                        >
                            dec18anu@gmail.com
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium shadow-md hover:bg-blue-500 transition"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                    <a href="/" className=""></a>
                </div>
            </div>
        </div>
    );
};

export default About;
