import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtctedRoute(props: any) {

    const { Component } = props;

    const navigate = useNavigate();

    useEffect(() => {
        let login = sessionStorage.getItem('logindata');

        if (!login) {
            navigate('/')
        } else {
            navigate('/menu')
        }
    })
    return (
        <Component />
    )
}

export default ProtctedRoute 