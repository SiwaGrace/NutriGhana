from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class CustomLoginView(APIView):
    def post(self, request, *args, **kwargs):
        login_input = request.data.get("username")
        password = request.data.get("password")

        if not login_input or not password:
            return Response({"detail": "Please provide username/email and password."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Try to find a user by username OR email
        try:
            user = User.objects.get(username=login_input)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email=login_input)
            except User.DoesNotExist:
                return Response({"detail": "Invalid login credentials."},
                                status=status.HTTP_401_UNAUTHORIZED)

        # Authenticate using username
        user = authenticate(username=user.username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user_id": user.id,
                "username": user.username,
                "email": user.email
            })
        else:
            return Response({"detail": "Invalid login credentials."},
                            status=status.HTTP_401_UNAUTHORIZED)
