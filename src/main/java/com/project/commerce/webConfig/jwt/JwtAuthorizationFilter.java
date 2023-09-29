package com.project.commerce.webConfig.jwt;

import com.project.commerce.auth.service.UserDetailsServiceImpl;
import com.project.commerce.user.entity.User;
import com.project.commerce.user.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final UserRepository repository;
    private final JwtTokenProvider jwtTokenUtil;
    private final UserDetailsServiceImpl jwtUserDetailsService;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);
        String username = null;
        String authToken = null;
//        if(req.getRequestURI().equals("/api/login")){
//            res.setHeader("Access-Control-Allow-Origin", "*");
//            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//            res.setHeader("Access-Control-Max-Age", "3600");
//            res.setHeader("Access-Control-Allow-Headers", "authorization, isrefreshtoken, content-type, xsrf-token");
//            res.addHeader("Access-Control-Expose-Headers", "xsrf-token");
//            if ("OPTIONS".equals(req.getMethod())) {
//                res.setStatus(HttpServletResponse.SC_OK);
//            } else {
//                chain.doFilter(req, res);
//            }
//            //return ;
//        }

        Enumeration<String> headerNames = req.getHeaderNames();

        HashMap<String, List<String>> set = new HashMap<>();
        while (headerNames.hasMoreElements()) {

            String headerName = headerNames.nextElement();

            List<String> fake = new ArrayList<>();
            Enumeration<String> headers = req.getHeaders(headerName);
            while (headers.hasMoreElements()) {
                String headerValue = headers.nextElement();
                fake.add(headerValue);
            }

            set.put(headerName,fake);
        }



        if (header != null && header.startsWith(TOKEN_PREFIX)) {
            authToken = header.replace(TOKEN_PREFIX, "");
            try {
                username = jwtTokenUtil.getUsernameFromToken(authToken);
            } catch (IllegalArgumentException e) {
                System.out.println("an error occured during getting username from token"+ e);
                //log.error();
            } catch (ExpiredJwtException e) {

                String isRefreshToken = req.getHeader("isRefreshToken");
                String requestURL = req.getRequestURL().toString();
                // allow for Refresh Token creation if following conditions are true.
                if (isRefreshToken != null && isRefreshToken.equals("true") && requestURL.contains("refresh-token")) {
                    allowForRefreshToken(e, req);
                } else
                    req.setAttribute("exception", e);

                System.out.println("the token is expired and not valid anymore"+ e);
                //log.warn();
            } catch (SignatureException e) {
                System.out.println("Authentication Failed. Username or Password not valid.");

            } catch (MalformedJwtException exception) {
                System.out.println("Request to parse invalid JWT : failed : {}"+ exception.getMessage());

            }
        } else {
            System.out.println("couldn't find bearer string, will ignore the header");
            //log.warn();
        }
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);

            if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                Optional<User> user = repository.findByUsername(username);


                Set<GrantedAuthority> authorities = new HashSet<>();
                authorities.add(new SimpleGrantedAuthority("ROLE_"+user.get().getRole().name()));
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, authorities);
                //userDetails, null, Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN")));
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                System.out.println("authenticated user " + username + ", setting security context");
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }


        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Max-Age", "3600");
        res.setHeader("Access-Control-Allow-Headers", "authorization, isrefreshtoken, content-type, xsrf-token");
        res.addHeader("Access-Control-Expose-Headers", "xsrf-token");
        if ("OPTIONS".equals(req.getMethod())) {
            res.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(req, res);
        }
    }

    private void allowForRefreshToken(ExpiredJwtException ex, HttpServletRequest request) {

        // create a UsernamePasswordAuthenticationToken with null values.
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                null, null, null);
        // After setting the Authentication in the context, we specify
        // that the current user is authenticated. So it passes the
        // Spring Security Configurations successfully.
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        // Set the claims so that in controller we will be using it to create
        // new JWT
        request.setAttribute("claims", ex.getClaims());

    }
}
