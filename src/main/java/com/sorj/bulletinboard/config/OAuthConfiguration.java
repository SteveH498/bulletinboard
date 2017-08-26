package com.sorj.bulletinboard.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.RemoteTokenServices;

@Configuration
@PropertySource("classpath:properties/config.properties")
public class OAuthConfiguration extends ResourceServerConfigurerAdapter {

	@Autowired
	Environment env;

	@Bean
	public RemoteTokenServices remoteTokenServices() {
		final RemoteTokenServices tokenServices = new RemoteTokenServices();
		tokenServices.setCheckTokenEndpointUrl(env.getProperty("oauth2.tokenEndpointURL"));
		tokenServices.setClientId(env.getProperty("oauth2.clientID"));
		tokenServices.setClientSecret(env.getProperty("oauth2.clientSecret"));
		return tokenServices;
	}

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		resources.tokenServices(remoteTokenServices()).resourceId(env.getProperty("oauth2.resourceID"));
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().anyRequest().authenticated();
	}
}