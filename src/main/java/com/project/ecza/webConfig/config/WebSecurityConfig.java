package com.project.ecza.webConfig.config;

 
import com.project.ecza.webConfig.jwt.JwtAuthenticationEntryPoint;
import com.project.ecza.webConfig.jwt.JwtAuthorizationFilter;
import com.project.ecza.webConfig.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private JwtAuthorizationFilter jwtRequestFilter;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //Cross-origin-resource-sharing
        http.cors().and()
                .authorizeRequests()
                //These are public pages.
                .antMatchers("/logout/default/**","/api/login","/refresh-token","/resources/**", "/error" ,"/image/barcode/**","/show-document/**").permitAll()
//                .antMatchers(HttpMethod.POST,"/api/login").permitAll()
//                .antMatchers(HttpMethod.POST,"/api/registration").permitAll()
                //These can be reachable for just have admin role.

                // /api/customer/order/**
                //
                .antMatchers("/api/registration").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                .antMatchers("/api/supplier/**", "/api/supervisor/**", "/api/supply/**").hasAnyAuthority("ROLE_PURCHASE", "ROLE_ADMIN", "ROLE_MANAGER","ROLE_WAREHOUSEMAN")
                .antMatchers( "/api/refund/**").hasAnyAuthority("ROLE_PURCHASE", "ROLE_ADMIN", "ROLE_MANAGER","ROLE_WAREHOUSEMAN")
                .antMatchers( "/api/pharmacy/**").hasAnyAuthority("ROLE_PHARMACY", "ROLE_ADMIN")
                .antMatchers("/api/company/**", "/api/customer/**","/api/customer/order/**", "/api/customer/order/drug/**").hasAnyAuthority("ROLE_EXPORTER", "ROLE_ADMIN", "ROLE_MANAGER")
                //.antMatchers("/api/customer/order/**", "/api/customer/order/drug/**").hasAnyAuthority("ROLE_EXPORTER", "ROLE_ADMIN", "ROLE_MANAGER")
                .antMatchers("/api/admin/**","/api/admin/user/**").hasRole("ADMIN")
                .antMatchers("/api/manager/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER")
                .antMatchers("/api/receipt").hasAnyAuthority( "ROLE_ADMIN")

                .antMatchers( "/api/supply/**").hasAnyAuthority("ROLE_WAREHOUSEMAN", "ROLE_ADMIN","ROLE_PURCHASE")
                .antMatchers("/api/final-receipt-warehouseman/**").hasAnyAuthority("ROLE_WAREHOUSEMAN", "ROLE_ADMIN")
                .antMatchers("/api/final-receipt-accounting/**").hasAnyAuthority("ROLE_ACCOUNTING", "ROLE_ADMIN")
                .antMatchers("/api/supplier/**","/api/stock/**", "/api/depot/**", "/api/order-acceptance/**", "/api/stock-counting/**", "/api/communication/**", "/api/box/**", "/api/small-box/**", "/api/refund-acceptance/**").hasAnyAuthority("ROLE_WAREHOUSEMAN","ROLE_MANAGER", "ROLE_ADMIN","ROLE_PURCHASE", "ROLE_LOGISTIC")
//                .antMatchers("/api/user/**").hasRole("USER")
//                .antMatchers("/api/exporter/**").hasRole("EXPORTER")
                //.antMatchers("/api/customer/**").hasRole("CUSTOMER")
                //all remaining paths should need authentication.
                .anyRequest().fullyAuthenticated()
                .and()
                //logout will log the user out by invalidate session.
                .logout().permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout", "POST")).and()
                //login form and path
                //.formLogin().loginPage("/api/user/login").and()
                //enable basic authentication. Http header: basis username:password
                .httpBasic().and()
                //Cross side request forgery.0
                .csrf().disable()


        //Cross side request forgery.
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); // Add our custom JWT security filter


        //http.addFilter(new JwtAuthorizationFilter(authenticationManager(), tokenProvider));
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    //Cross origin resource sharing.
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
            }
        };
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token","isRefreshToken"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
