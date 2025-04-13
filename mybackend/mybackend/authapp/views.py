from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, UserProfileSerializer


# create registration for user
class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user_id": user.id,
                "username": user.username,
                "email": user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# receive login details
class CustomLoginView(APIView):
    def post(self, request, *args, **kwargs):
        login_input = request.data.get("username")
        password = request.data.get("password")

        if not login_input or not password:
            return Response({"detail": "Please provide username/email and password."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            # receive regular user input
            user = User.objects.get(username=login_input)
        except User.DoesNotExist:
            try:
                # Then try to find user by email
                user = User.objects.get(email=login_input)
            except User.DoesNotExist:
                return Response({"detail": "Invalid login credentials."},
                                status=status.HTTP_401_UNAUTHORIZED)

        # Now authenticate using the username (even if found by email)
        user = authenticate(username=user.username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user_id": user.id,
                "username": user.username,
                "email": user.email,
                "is_admin": user.is_staff or user.groups.filter(name="Admin").exists()
            })
        else:
            return Response({"detail": "Invalid login credentials."},
                            status=status.HTTP_401_UNAUTHORIZED)


# logout from the system
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    # logout from the system
    def post(self, request, *args, **kwargs):
        try:
            # Get the token associated with the authenticated user
            token = request.user.auth_token
            if token:
                token.delete()  # Delete the token from the database
                return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "No token associated with user."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    # Update user profile
    def put(self, request):
        profile = request.user.profile
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)