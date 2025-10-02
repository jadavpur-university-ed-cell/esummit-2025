# E-SUMMIT 2025 WEBSITE:

### //TODO s:
- [ ] Move all Prisma Client to one directory and one object call only (no multiple calls and API overloading)

### Features Missing:
- UI for login and routing post OAuth 2.0
- Data in Events
- mobile friendly view
- api consummation @frontend

### Known Issues:

_[Branch] - pkg_

```
./app/(routes)/admin/teams/[eventName]/ExportCSV.tsx
4:40  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
24:23  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./app/(routes)/admin/teams/[eventName]/Teams.tsx
10:52  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
60:74  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
63:37  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
68:37  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
84:43  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
178:22  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./app/(routes)/admin/teams/[eventName]/page.tsx
5:32  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
```

### Possible Integration on event registration notification

```
// PSEUDOCODE: Event Registration Notification System

FUNCTION handleEventRegistration(userId, eventSlug, registrationType, teamMembers = []) {
    TRY:
        // 1. Get event details
        event = GET_EVENT_BY_SLUG(eventSlug)
        
        // 2. Register user/team for event
        IF registrationType === 'SOLO':
            ADD_USER_TO_EVENT(userId, event.id)
            
            // Send solo registration notification
            NOTIFICATION_SERVICE.addNotification(
                userId,
                `Registered for ${event.name}`,
                `You've successfully registered for ${event.name}. Check your dashboard for updates.`
            )
            
        ELSE IF registrationType === 'TEAM':
            team = CREATE_TEAM(userId, teamMembers, event.id)
            
            // Notify team leader
            NOTIFICATION_SERVICE.addNotification(
                userId,
                `Team Registered for ${event.name}`,
                `Your team has been registered for ${event.name}. Team members will receive invitations.`
            )
            
            // Notify each team member
            FOR EACH member IN teamMembers:
                NOTIFICATION_SERVICE.addNotification(
                    member.userId,
                    `Team Invitation for ${event.name}`,
                    `You've been invited to join a team for ${event.name}. Please accept the invitation.`
                )
        
        // 3. Admin notification (if needed)
        NOTIFICATION_SERVICE.addNotification(
            ADMIN_USER_ID,
            `New Registration for ${event.name}`,
            `${user.name} has registered for the event.`
        )
        
    CATCH error:
        LOG_ERROR("Registration failed:", error)
        NOTIFICATION_SERVICE.addNotification(
            userId,
            "Registration Failed",
            "Your event registration failed. Please try again or contact support."
        )
}

// Real implementation example
FUNCTION registerForEvent(userData, eventData, teamData) {
    // Different notification scenarios:
    
    // Scenario 1: Successful solo registration
    IF (eventData.isSolo && registrationSuccessful) {
        SEND_NOTIFICATION(userData.id, {
            title: "Successfully Registered!",
            description: `You are now registered for ${eventData.name}. Event details will be shared soon.`,
            type: "REGISTRATION_SUCCESS"
        })
    }
    
    // Scenario 2: Team registration - leader
    IF (teamData.isLeader && registrationSuccessful) {
        SEND_NOTIFICATION(userData.id, {
            title: "Team Registration Complete",
            description: `Your team has been registered for ${eventData.name}. Waiting for member confirmations.`,
            type: "TEAM_LEADER_SUCCESS"
        })
    }
    
    // Scenario 3: Team registration - member invitation
    IF (teamData.isMember && receivedInvitation) {
        SEND_NOTIFICATION(userData.id, {
            title: "Team Invitation Received",
            description: `You've been invited to join ${teamData.teamName} for ${eventData.name}.`,
            type: "TEAM_INVITATION"
        })
    }
    
    // Scenario 4: Registration rejection (if event full, etc.)
    IF (registrationRejected) {
        SEND_NOTIFICATION(userData.id, {
            title: "Registration Not Accepted",
            description: `Your registration for ${eventData.name} couldn't be processed. Event might be full.`,
            type: "REGISTRATION_REJECTED"
        })
    }
}
```

### Pseudocode for certificate generation:

```
// PSEUDOCODE: Certificate Download Notification

FUNCTION notifyCertificateAvailability(userId, certificateUrl, eventName) {
    TRY:
        // Single notification when certificate is ready for download
        NOTIFICATION_SERVICE.addNotification(
            userId,
            "Certificate Available!",
            `Your certificate for ${eventName} is ready to download.`,
            {
                certificateUrl: certificateUrl,
                eventName: eventName,
                downloadAction: "DOWNLOAD_CERTIFICATE"
            }
        )
        
        // Optional: Send email with direct download link
        IF (user.preferences.emailNotifications) {
            EMAIL_SERVICE.send({
                to: user.email,
                subject: `Your ${eventName} Certificate is Ready`,
                template: "certificate_available",
                data: {
                    userName: user.name,
                    eventName: eventName,
                    downloadLink: certificateUrl,
                    expiryDate: ADD_30_DAYS() // Link expires in 30 days
                }
            })
        }
        
    CATCH error:
        LOG_ERROR("Certificate notification failed:", error)
}

// USAGE - When certificate link is generated:
FUNCTION handleCertificateGenerationComplete(userId, eventId) {
    // Generate certificate and get downloadable link
    certificateData = GENERATE_CERTIFICATE_PDF(userId, eventId)
    downloadUrl = UPLOAD_TO_CDN(certificateData) // Returns https://cdn.example.com/certificates/xyz.pdf
    
    // Store link in database
    SAVE_CERTIFICATE_LINK(userId, eventId, downloadUrl)
    
    // Send notification with the direct download link
    notifyCertificateAvailability(userId, downloadUrl, event.name)
}
```

### backend api integration for id cards and cert (links may vary):
```
// app/api/certificates/generate/route.ts
export async function POST(request: Request) {
  try {
    const { eventId, userIds } = await request.json();

    // Generate certificates and get download URLs
    const certificateResults = await Promise.all(
      userIds.map(async (userId: string) => {
        const certificateUrl = await generateCertificate(userId, eventId);
        
        // Send notification immediately after generation
        await downloadNotificationService.notifyCertificateDownload(
          userId,
          certificateUrl,
          event.name
        );

        return { userId, certificateUrl, success: true };
      })
    );

    return Response.json({
      success: true,
      data: certificateResults,
      message: `Certificates generated and notifications sent for ${certificateResults.length} users`
    });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Certificate generation failed' },
      { status: 501 }
    );
  }
}

// app/api/id-cards/generate/route.ts
export async function POST(request: Request) {
  try {
    const { eventId, userIds } = await request.json();

    const idCardResults = await Promise.all(
      userIds.map(async (userId: string) => {
        const idCardUrl = await generateIDCard(userId, eventId);
        
        // Send notification immediately after generation
        await downloadNotificationService.notifyIDCardDownload(
          userId,
          idCardUrl,
          event.name
        );

        return { userId, idCardUrl, success: true };
      })
    );

    return Response.json({
      success: true,
      data: idCardResults,
      message: `ID cards generated and notifications sent for ${idCardResults.length} users`
    });
  } catch (error) {
    return Response.json(
      { success: false, error: 'ID card generation failed' },
      { status: 501 }
    );
  }
}
```