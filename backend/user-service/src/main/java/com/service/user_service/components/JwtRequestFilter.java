package com.service.user_service.components;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final String SECRET_KEY;

    public JwtRequestFilter(@Value("${jwt.SECRET_KEY}") String SECRET_KEY){
        this.SECRET_KEY = SECRET_KEY;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        String login = null;
        String jwt = null;

        if(authHeader != null && authHeader.startsWith("Bearer")){
            jwt = authHeader.substring(7);
            try{
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(SECRET_KEY.getBytes())
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                login = claims.getSubject();
            }
            catch (io.jsonwebtoken.ExpiredJwtException e){
                String refreshToken = getRefreshTokenFromCookie(request);

            }
            catch (Exception e){
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token expired or invalid");
                return;
            }
        }

        if(login != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    login, null, Collections.emptyList()
            );
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request, response);
    }

    private String getRefreshTokenFromCookie(HttpServletRequest request){
        if(request.getCookies() != null){
            for(Cookie cookie : request.getCookies()){
                if("refresh".equals(cookie.getName())){
                    return cookie.getValue();
                }
            }
        }
        return  null;
    }
}
