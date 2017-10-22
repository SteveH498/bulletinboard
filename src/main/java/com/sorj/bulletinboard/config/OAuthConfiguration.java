package com.sorj.bulletinboard.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.RemoteTokenServices;

// Only enable OAuth configuration in production
@Profile("!default")
@Configuration
@EnableResourceServer
public class OAuthConfiguration extends ResourceServerConfigurerAdapter {

	@Autowired
	Environment env;

	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Bean
	public RemoteTokenServices remoteTokenServices() {
		final RemoteTokenServices tokenServices = new RemoteTokenServices();
		tokenServices.setCheckTokenEndpointUrl(
				env.getProperty("vcap.services.oauth2-auth-server.credentials.check-token-url"));
		tokenServices.setClientId(env.getProperty("vcap.services.oauth2-auth-server.credentials.clientID"));
		tokenServices.setClientSecret(env.getProperty("vcap.services.oauth2-auth-server.credentials.clientSecret"));
		return tokenServices;
	}

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		resources.tokenServices(remoteTokenServices())
				.resourceId(env.getProperty("vcap.services.oauth2-auth-server.credentials.resourceID"));
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		//http.authorizeRequests().anyRequest().permitAll();
		http.authorizeRequests().antMatchers("/", "/index.html").permitAll().anyRequest().authenticated();
	}
}