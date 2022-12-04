package com.naturefitness.springrestapi.rest.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ClientDTO {

	private Integer id;
	private PersonalDataDTO data;
	private List<Integer> trainers;
	private List<Integer> workouts;

}
