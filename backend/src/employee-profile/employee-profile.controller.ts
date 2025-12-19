import { Controller, Get, Put, Post, Param, Body, Req, Delete } from '@nestjs/common';
import { EmployeeProfileService } from './employee-profile.service';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CreateChangeRequestDto } from './dto/change-request.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';

@Controller('employee-profile')
export class EmployeeProfileController {
  constructor(private readonly employeeProfileService: EmployeeProfileService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.employeeProfileService.getProfile(id);
  }

  @Put(':id/contact')
  async updateContactInfo(
    @Param('id') id: string,
    @Body() dto: UpdateContactDto,
    @Req() req: any,
  ) {
    return this.employeeProfileService.updateContactInfo(id, dto);
  }

  @Post(':id/change-request')
  async submitChangeRequest(
    @Param('id') id: string,
    @Body() dto: CreateChangeRequestDto,
  ) {
    return this.employeeProfileService.submitChangeRequest(
      id,
      dto.changes,
      dto.reason,
    );
  }

  @Get('team/:managerId')
  async getTeam(@Param('managerId') managerId: string) {
    return this.employeeProfileService.getTeamProfiles(managerId);
  }

  @Post('change-request/:requestId/approve')
  async approveRequest(
    @Param('requestId') requestId: string,
    @Param('adminId') adminId: string,
  ) {
    return this.employeeProfileService.approveChangeRequest(requestId);
  }

  @Put('admin/:id')
  async adminUpdate(
    @Param('id') id: string,
    @Body() dto: any,
    @Req() req: any,
  ) {
    return this.employeeProfileService.adminUpdateProfile(id, dto);
  }

  // Candidate endpoints
  @Post('candidates')
  async createCandidate(@Body() dto: CreateCandidateDto) {
    return this.employeeProfileService.createCandidate(dto);
  }

  @Get('candidates')
  async getAllCandidates() {
    return this.employeeProfileService.getAllCandidates();
  }

  @Get('candidates/:id')
  async getCandidateById(@Param('id') id: string) {
    return this.employeeProfileService.getCandidateById(id);
  }

  @Put('candidates/:id')
  async updateCandidate(@Param('id') id: string, @Body() dto: any) {
    return this.employeeProfileService.updateCandidate(id, dto);
  }

  @Delete('candidates/:id')
  async deleteCandidate(@Param('id') id: string) {
    return this.employeeProfileService.deleteCandidate(id);
  }
}
