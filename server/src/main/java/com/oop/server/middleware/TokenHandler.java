package com.oop.server.middleware;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.oop.server.secret.SecretKeyENV;

public class TokenHandler {

    public String generateToken(String username) {
        String token = "";
        try {
            Algorithm algorithm = Algorithm.HMAC256(SecretKeyENV.secretKey);

            token = JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000 )) // 10 นาที
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withClaim("roles", "USER")
                .sign(algorithm);
        } catch (JWTCreationException exception){
            return "Erorr";
        }

        return token;
    }

    public DecodedJWT verifyToken(String token){
        DecodedJWT decodedJWT;
        Algorithm algorithm = Algorithm.HMAC256(SecretKeyENV.secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        decodedJWT = verifier.verify(token);
        
        return decodedJWT;
    }
}
