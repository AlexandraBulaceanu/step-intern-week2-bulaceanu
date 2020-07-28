package com.google.sps.data;

public final class User{
    private String username;
    private String password;//really bad practice, I know
    private String nickname;
    private String email;
    private boolean loggedIn;
    private String url;

    public User(boolean loggedIn, String url){
        this.loggedIn = loggedIn;
        this.url = url;
    }

    public User(String username, String password, String nickname, String email, boolean loggedIn, String url){
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
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