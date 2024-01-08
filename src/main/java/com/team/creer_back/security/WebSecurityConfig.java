package com.team.creer_back.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// 스프링 보안의 환경설정을 구성하기 위한 클래스
@EnableWebSecurity // 스프링 보안 설정을 활성화
@RequiredArgsConstructor
@Configuration // 해당 클래스가 스프링 설정 클래스라는 것을 명시
@Component
public class WebSecurityConfig implements WebMvcConfigurer {
    /*
    WebMvcConfigurer : 스프링 보안은 스프링에서 인증과 인가 기능을 지원하는 프레임워크로, 스프링 MVC 기반 애플리케이션 보안을 적용하기 위한 표준이다. 스프링 MVC는 DispatcherServlet이라는 특별한 서블릿을 통해 요청을 처리한다. 해당 서블릿은 모든 종류의 요청을 한 곳에서 받아 적절한 Controller에게 분배하는 역할을 수행한다.
    */

    private final TokenProvider tokenProvider; // JWT 생성 및 검증하는 클래스
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    // 비밀번호를 암호화
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCrypt 알고리즘으로 암호화
    }

    // HTTP 보안 설정을 정의
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic() // HTTP 기본 인증 활성화
                .and()
                .csrf().disable() // 개발 환경에서의 편의를 위해 CSRF 보안 기능 비활성화
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용 X
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint) // 인증 실패시 처리할 클래스 지정
                .accessDeniedHandler(jwtAccessDeniedHandler) // 인가 실패 시 처리할 클래스 지정
                .and()
                .authorizeRequests()

                // 특정 경로에 대해서 인증 없이 허용
                .antMatchers("/auth/**", "/ws/**", "/movies/**", "/test/**", "/api/auction/new/**", "/api/auction/**", "/api/goods/insert", "/Review/**", "/member/**", "/email/**", "/MyPage/**", "/Cart/**", "/api/goods/list/**", "/refresh/**", "/", "/static/**").permitAll()

                // Swagger 에 관련된 리소스에 대해서 인증 없이 허용
                .antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**", "/sign-api/exception").permitAll()
                .anyRequest().authenticated() // 나머지 모든 요청은 인증이 필요
                .and()

                // .apply 메서드 : HttpSecurity 객체에 구성을 적용하기 위한 메서드이다.
                // 즉 사용자가 정의한 JwtSecurityConfig 클래스를 HttpSecurity에 적용하는 것
                .apply(new com.team.creer_back.security.JwtSecurityConfig(tokenProvider))
                .and();

        return http.build();
    }
}