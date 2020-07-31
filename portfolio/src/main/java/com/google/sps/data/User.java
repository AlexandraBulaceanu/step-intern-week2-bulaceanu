package com.google.sps.data;

public final class User{

    private boolean loggedIn;
    private String url;

    public User(boolean loggedIn, String url){
        this.loggedIn = loggedIn;
        this.url = url;
    }

    public boolean getLoggedIn(){
        return this.loggedIn;
    }
}
