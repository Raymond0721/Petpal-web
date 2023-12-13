/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithToken } from "../../services/utils";
import "../../assets/css/ApplicationStyle.css";
import Sidebar, { generateApplicationSidebar } from "../../components/buttons/Sidebar";
import ApplicationSubmitted from "./ChildComponents/ApplicationSubmitted";
import SubmissionStatus from "./ChildComponents/SubmissionStatus";
import ApplicationConversation from "../ApplicationComment";

const ApplicationDetails = () => {
    const { appId } = useParams();
    const [app, setApplication] = useState(null);
    const [error, setError] = useState("");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        const fetchApplicationDetails = async () => {
            try {
                const response = await fetchWithToken(`/applications/${currentUser.role}/${appId}/`);
                if (!response.ok) {
                    if (response.status === 403) {
                        setError("You do not have permission to view this application."); // Set the appropriate error message
                    } else if (response.status === 404) {
                        setError(`Application not found.`);
                    }
                } else {
                    const jsonData = await response.json();
                    setApplication(jsonData);
                }
            } catch (error) {
                console.error("Error fetching application data:", error);
                setError("Error fetching data");
            }
        };

        fetchApplicationDetails();
    }, [appId]);

    return currentUser ? (
        <div className="container mt-5">
            <div className="row d-lg-flex flex-lg-row justify-content-between">
                <Sidebar navItems={generateApplicationSidebar(currentUser.id)} />
                {/* Main section for application detail */}
                <div className="col col-12 col-lg-8  main-dark-color">
                    {error ? (
                        <div className="col col-12 main-dark-color h5 p-4">{error}</div>
                    ) : app ? (
                        <>
                            {/* Display submitted application */}
                            <ApplicationSubmitted app={app} />
                            <hr className="mb-4 mt-5" />
                            {/* Update application status based on logged-in user role */}
                            <SubmissionStatus app={app} currentUser={currentUser} />
                            <hr className="my-4" />
                            {/* Conversation between seeker & shelter */}
                            <ApplicationConversation applicationId={appId} currentUser={currentUser} />
                        </>
                    ) : (
                        <>Loading...</>
                    )}
                </div>
            </div>
        </div>
    ) : (
        // Return empty when user not logged-in
        <></>
    );
};

export default ApplicationDetails;
