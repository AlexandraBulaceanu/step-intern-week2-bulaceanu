package com.google.sps.data;

public final class User{
    private String email;
    private boolean loggedIn;
    private String url;

    public User(boolean loggedIn, String url){
        this.loggedIn = loggedIn;
        this.url = url;
    }


    public User(String email, boolean loggedIn, String url){
        this.email = email;
        this.loggedIn = loggedIn;
        this.url = url;
    }

    public boolean getLoggedIn(){
        return this.loggedIn;
    }

}